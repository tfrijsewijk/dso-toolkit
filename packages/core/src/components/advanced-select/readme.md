# `<dso-advanced-select>`



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                               | Type                                       | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `active`     | --            | The active option. By object reference.                                   | `AdvancedSelectOption<never> \| undefined` | `undefined` |
| `activeHint` | `active-hint` | An extra text for the active option. Only visible in the list of options. | `string \| undefined`                      | `undefined` |
| `options`    | --            | The options to display in the select.                                     | `AdvancedSelectOptionOrGroup<never>[]`     | `[]`        |


## Events

| Event         | Description                                        | Type                                            |
| ------------- | -------------------------------------------------- | ----------------------------------------------- |
| `dsoChange`   | Emitted when user selects an option                | `CustomEvent<AdvancedSelectChangeEvent<never>>` |
| `dsoRedirect` | Emitted when user activates a group redirect link. | `CustomEvent<AdvancedSelectRedirectEvent>`      |


## Dependencies

### Depends on

- [dso-badge](../badge)
- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-advanced-select --> dso-badge
  dso-advanced-select --> dso-icon
  style dso-advanced-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
