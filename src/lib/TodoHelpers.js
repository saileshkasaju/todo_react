export const addTodo = (list, item) => Object.assign([], [...list,item])
// alternatively list.concat(item)
// or [...list, item]

export const generateId = () => Math.floor(Math.random() * 100000)

export const findById = (id, list) => list.find(item => item.id === id)

export const toggleTodo = (todo) => Object.assign({},{...todo, isCompleted: !todo.isCompleted})
// alternatively {...todo, isCompleted: !todo.isCompleted}

export const updateTodo = (list, updated) => {
	const updatedIndex = list.findIndex(item => item.id === updated.id)

	return Object.assign([], [
		...list.slice(0, updatedIndex),
		updated,
		...list.slice(updatedIndex + 1)
	])
/* alternatively [
	...list.slice(0, updatedIndex),
	updated,
	...list.slice(updatedIndex + 1)
] */
}
export const removeTodo = (list, id) => {
	const removeIndex = list.findIndex(item => item.id === id)

	return Object.assign([], [
		...list.slice(0, removeIndex),
		...list.slice(removeIndex + 1)
	])
	/* alternatively [
	...list.slice(0, removeIndex),
	...list.slice(removeIndex + 1)
] */
}
export const filterTodos = (list, route) => {
  switch(route) {
    case '/active':
      return list.filter(item => !item.isCompleted)
    case '/complete':
      return list.filter(item => item.isCompleted)
    default:
      return list
  }
}
