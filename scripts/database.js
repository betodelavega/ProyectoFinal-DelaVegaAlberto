const dbName = 'convertidorMonedaDb';
let database;

// Obtiene la base de datos del localStorage o la inicializa si no existe
const getDb = () => {
  if (database) return database;
  const dbStringFormat = localStorage.getItem(dbName);
  if (!dbStringFormat) {
    database = { users: {} };
    saveDb();
  } else {
    database = JSON.parse(dbStringFormat);
  }
  return database;
};

// Guarda la base de datos en el localStorage
const saveDb = () => {
  localStorage.setItem(dbName, JSON.stringify(database));
};

// Obtiene un ítem por su ID de una tabla específica
const getItemById = (id, table) => {
  const db = getDb();
  const item = db?.[table]?.[id];
  return item;
};

// Obtiene todos los ítems de una tabla específica
const getItems = (table) => {
  const db = getDb();
  const items = db?.[table];
  return items && Object.values(items);
};

// Agrega un ítem a una tabla específica
const addItem = (item, table) => {
  const db = getDb();
  db[table] = db[table] || {};
  db[table][item.id] = item;
  saveDb();
  return item;
};

// Actualiza un ítem en una tabla específica
const updateItem = (item, table) => {
  const db = getDb();
  db[table][item.id] = item;
  saveDb();
  return item;
};

// Elimina un ítem por su ID de una tabla específica
const deleteItem = (id, table) => {
  const db = getDb();
  delete db[table][id];
  saveDb();
  return true;
};

export {
  getDb,
  saveDb,
  getItemById,
  getItems,
  addItem,
  updateItem,
  deleteItem,
};
