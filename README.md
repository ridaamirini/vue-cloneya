# vue-cloneya
[![npm](https://img.shields.io/npm/v/vue-cloneya.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-cloneya)
[![npm](https://img.shields.io/npm/dt/vue-cloneya.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-cloneya)
[![npm](https://img.shields.io/npm/l/vue-cloneya.svg?style=for-the-badge)](https://www.npmjs.com/package/vue-cloneya)

> A vue component to clone DOM elements

<p align="center">
  <img src="https://media.giphy.com/media/vwEHGHTjE9hO0PIaVH/giphy.gif">
</p>

[Live demo here](https://codesandbox.io/s/rmoq935pjp)

## Install

```bash
yarn add vue-cloneya
# or
npm i vue-cloneya
```

## Import

```js
import Vue      from 'vue'
import VueCloneya from 'vue-cloneya'

Vue.use(VueCloneya)
```
## Example
```vue
<vue-cloneya :maximum="5" :value="exampleData">
  <div class="input-group">
      <!-- Add the "v-cloneya-input" directive to elements you wish to set v-bind:value -->
      <!-- Only input, select, radio, checkbox etc. -->
      <input type="text" name="example[]" class="form-control" placeholder="Example" v-cloneya-input>
      <span class="input-group-btn">
        <!-- Add the "v-cloneya-add" directive to elements you wish to add the click listener
        that will clone the root element -->
        <button type="button" class="btn btn-success" tabindex="-1" v-cloneya-add>
            <i class="fa fa-plus"></i>
        </button>
        <!-- Add the "v-cloneya-remove" directive to elements you wish to add the click listener
        that will remove the element -->
        <button type="button" class="btn btn-danger" tabindex="-1"  v-cloneya-remove>
          <i class="fa fa-minus"></i>
        </button>
      </span>
  </div>
</vue-cloneya>
```
#### Output:
```Javascript
[
  "Some value",
  // ...
]
```

#### With multiple elements:
```vue
<vue-cloneya :maximum="5" :value="exampleData">
  <div class="input-group">
      <!-- Add the "v-cloneya-input" directive to elements you wish to set v-bind:value -->
      <!-- Only input, select, radio, checkbox etc. -->
      <input type="text" class="form-control" placeholder="Firstname" v-cloneya-input="'Firstname'">
      <input type="text" class="form-control" placeholder="Lastname" v-cloneya-input="'Lastname'">
      <span class="input-group-btn">
        <!-- Add the "v-cloneya-add" directive to elements you wish to add the click listener
        that will clone the root element -->
        <button type="button" class="btn btn-success" tabindex="-1" v-cloneya-add>
            <i class="fa fa-plus"></i>
        </button>
        <!-- Add the "v-cloneya-remove" directive to elements you wish to add the click listener
        that will remove the element -->
        <button type="button" class="btn btn-danger" tabindex="-1"  v-cloneya-remove>
          <i class="fa fa-minus"></i>
        </button>
      </span>
  </div>
</vue-cloneya>
```
#### Output:
```Javascript
[
  { 
    Firstname: "VALUE",
    Lastname: "VALUE"
   }
   // ...
]
```

## API

### Props

#### minimum

- __Type__: `number`
- __Default__: `1`

The minimum number of clones allowed.

#### maximum

- __Type__: `number`
- __Default__: `1`

The maximum number of clones allowed.

#### value

- __Type__: `array`
- __Default__: `null`

The values for the v-cloneya-input. For Two-way Data Binding use `v-model`

#### multiple

- __Type__: `boolean`
- __Default__: `false`

Enables multiple `v-model` on multiple `v-cloneya-input` elements. `Sinice 1.0.6`

### Events

When minimum limit is reached:
- `minimum:cloneya`

When maximum limit is reached:
- `maximum:cloneya`

## Directives

#### cloneyaInput
v-cloneya-input

- __Type__: `string` _optional_

If `:multiple="true"` is enabled, you must supply the key where you wanted to retrieve the data on `v-model`

#### cloneyaAdd
v-cloneya-add

#### cloneyaRemove
v-cloneya-remove

## Development

```bash
# for dev
yarn dev
#or 
npm run dev

# build with parcel-bundler
yarn build
#or
npm run build

```

## License

MIT © [ridaamirini](https://github.com/ridaamirini)
