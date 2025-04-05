import { component$, Resource } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import Loading from "./loading";


type Todo = {
  title: string
};

export const useTodo = routeLoader$(() => {
  return async () => {
    const randomTodo = Math.floor(Math.random() * 200) + 1;
    return await fetch(`https://jsonplaceholder.typicode.com/todos/${randomTodo}`)
      .then(r => r.json()) as Todo;
  }
});


export default component$(() => {

  const todo = useTodo();

  // NOTE: onPending does not work (yet) in Qwik
  // https://github.com/QwikDev/qwik/issues/4328

  return (
    <main class="flex flex-col justify-center items-center mt-5 gap-3">
      <h1 class="text-2xl">Todo</h1>
      <Resource
        value={todo}
        onPending={() => <Loading />}
        onResolved={(todo) => <h2>{todo.title}</h2>}
      />
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
