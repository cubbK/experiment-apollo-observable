# A repo for researching different ways to do side effects with apollo/graphql

A simple example where we explore how we can show a modal, wait for the modal to be closed and only after that fetch the data using apollo.

## Quick Start

- `yarn && yarn start`
- go to `./src/index.tsx` and change the import depending on what example you want to run

## Ways to do side effects:

### Hook + useLazyQuery way

Everything is done in a custom hook, dispatching redux actions, "waiting" for other actions back and fetching when needed with useLazyQuery. The waiting part is in quotes because it's not possible to actually wait, the whole hook will re-execute again on every `useSelector` change and this makes for some pretty cumbersome checks in useEffects.

Good point to start looking how it works in code: `src/hookWay/App.tsx`

### cache-only + fetching in sagas

Just because we use `useQuery` in a component doesn't mean that it needs to be fetched there.
We can disallow fetching in useQuery with `cache-only` and actually fetch using the same gql query in a saga, apollo is smart enough to update in the same place in it's cache and the component will receive the update automatically without needing to store anything in redux or local apollo state.

Good point to start looking how it works in code: `src/sagaWay/sagas.ts`

### zen-observable way

TODO don't know yet
