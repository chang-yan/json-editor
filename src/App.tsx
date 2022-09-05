import { useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

const initList = [
  {
    id: '1',
    task: 'Eat breakfast'
  },
  {
    id: '2',
    task: 'Take shower'
  },
  {
    id: '3',
    task: 'write homework'
  },
  {
    id: '4',
    task: 'Go jogging'
  }
];

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? "#4a2975" : "white",
  color: isDragging ? "white" : "black",
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle,
})

function App() {
  const [todos, setTodos] = useState(initList);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    console.log('result', result)
    if (!destination) return

    const tempList = Array.from(todos);
    const [newOrder] = tempList.splice(source.index, 1);
    tempList.splice(destination.index, 0, newOrder)

    setTodos(tempList)
  }
  return (
    <div className="App">
      <h1>
        Drag and Drop
      </h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='todo'>
          {(provided) => {
            console.log('provided', provided)
            return <div className='todo' {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => {
                const { id, task } = todo;
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {task}
                      </div>
                    )}
                  </Draggable>
                )
              })}
            </div>
          }}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
