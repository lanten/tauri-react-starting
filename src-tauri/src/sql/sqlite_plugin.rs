use std::{collections::HashMap, ops::Add, path::PathBuf, sync::Mutex};

use tauri::{
    api::path::app_data_dir,
    generate_context,
    plugin::{Builder, TauriPlugin},
    AppHandle, Manager, RunEvent, Runtime, State,
};

use rusqlite::{Connection, Result};

/// https://github.com/tauri-apps/tauri-plugin-sql/blob/dev/src/plugin.rs

#[derive(Debug)]
struct SqliteState {
    data_dir: PathBuf,
    db_instances: Mutex<HashMap<String, Connection>>,
}

impl Default for SqliteState {
    fn default() -> Self {
        let context = generate_context!();
        let data_dir = app_data_dir(context.config()).unwrap().join("db");

        if !data_dir.exists() {
            std::fs::create_dir_all(&data_dir).unwrap();
        }

        Self {
            data_dir,
            db_instances: Mutex::new(HashMap::new()),
        }
    }
}

#[tauri::command]
fn open<R: Runtime>(handle: AppHandle<R>, state: State<'_, SqliteState>, name: String) {
    // you can access `MyState` here!
    // let conn = Connection::open(state.data_dir.join(&name)).unwrap();

    let db_file = state.data_dir.join(name.clone() + ".db");

    let mut instances = state.db_instances.lock().unwrap();
    instances.insert(name.clone(), Connection::open(db_file).unwrap());

    log::info!("sqlite plugin do_something {:?} , {:?}", &name, instances);
}

#[tauri::command]
fn execute(state: State<'_, SqliteState>, name: String, sql: String) {
    let instances = state.db_instances.lock().unwrap();
    let conn = instances.get(&name).unwrap();
    // let mut stmt = conn.prepare(&sql).unwrap();
    // let rows = stmt.query_map([], |row| {
    //     let mut result = HashMap::new();
    //     for i in 0..row.column_count() {
    //         let name = row.column_name(i).unwrap();
    //         let value = row.get(i).unwrap();
    //         result.insert(name.to_string(), value);
    //     }
    //     result
    // });

    log::info!("execute {:?} , {:?}", &name, conn);
}

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    Builder::new("sqlite")
        .invoke_handler(tauri::generate_handler![open, execute])
        .setup(|app_handle| {
            log::info!("sqlite plugin setup");
            app_handle.manage(SqliteState::default());
            Ok(())
        })
        .on_event(|app, event| {
            if let RunEvent::Exit = event {
                tauri::async_runtime::block_on(async move {
                    // close all connections
                    let state = &*app.state::<SqliteState>();
                    let mut instances = state.db_instances.lock().unwrap();

                    // drain 迭代器会清空原始 hashmap
                    for (name, conn) in instances.drain() {
                        log::info!("close connection {:?}", name);
                        conn.close().unwrap();
                    }
                });
            }
        })
        .build()
}
