import React, { useEffect, useRef, useState } from 'react';
import { useTodoContext } from '../../context/TodosProvider';
import { Todo } from '../../types/Todo';

interface TodoCardProps {
  todo: Todo
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const
    {
      handleDeleteTodo,
      tempTodo,
      handleCheckboxClick,
      status,
      isToggled,
      setQueryTitle,
      handleSubmitEdit,
      editFormTodoId,
      setEditFormTodoId,
    } = useTodoContext();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localQueryTitle, setLocalQueryTitle] = useState<string>(todo.title);

  useEffect(() => {
    inputRef.current?.focus();
  }, [editFormTodoId]);

  useEffect(() => {
    setQueryTitle(localQueryTitle);
  }, [setQueryTitle, localQueryTitle, editFormTodoId]);

  return (
    <div data-cy="Todo" className={`todo ${todo.completed ? 'completed' : ''}`}>
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => handleCheckboxClick(todo)}
        />
      </label>

      {editFormTodoId === todo.id
        ? (
          <form onSubmit={(event) => handleSubmitEdit(event, todo)}>
            <input
              data-cy="TodoTitleField"
              type="text"
              className="todo__title-field"
              value={localQueryTitle}
              ref={inputRef}
              onChange={(event) => setLocalQueryTitle(event?.target.value)}
            />
          </form>
        )
        : (
          <>
            <span
              data-cy="TodoTitle"
              className="todo__title"
              onDoubleClick={() => {
                setLocalQueryTitle(todo.title);
                setEditFormTodoId(todo.id);
              }}
            >
              {localQueryTitle}
            </span>
            <button
              type="button"
              className="todo__remove"
              data-cy="TodoDelete"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              ×
            </button>
          </>
        )}
      <div
        data-cy="TodoLoader"
        className={`modal overlay ${
          todo.id === tempTodo?.id || status === todo.id || isToggled ? 'is-active' : ''}`}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};
