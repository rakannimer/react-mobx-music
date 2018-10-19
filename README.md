## React Mobx Music

### Install

```sh
yarn add react-mobx-music
```

### Usage

```jsx
<ReactMobxMusic instrumentNames={["accordion"]}>
  {({ isLoading, instruments }) =>
    isLoading ? (
      <div> Loading </div>
    ) : (
      <div>
        Loaded !
        <button
          onMouseDown={() => {
            instruments.get("accordion").play("A4");
          }}
          onMouseUp={() => {
            instruments.get("accordion").stop("A4");
          }}
        >
          Play A4
        </button>
      </div>
    )
  }
</ReactMobxMusic>
```
