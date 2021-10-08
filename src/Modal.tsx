import React from "react";
import Observable from "zen-observable";

let observable = new Observable((observer) => {
  // Emit a single value after 1 second
  let timer = setTimeout(() => {
    observer.next("hello");
    observer.complete();
  }, 2000);

  // On unsubscription, cancel the timer
  return () => clearTimeout(timer);
});

export default function Modal() {
  React.useEffect(() => {
    observable.subscribe({
      next: (x) => console.log(x),
    });
  }, []);

  return <div>Modal!!!</div>;
}
