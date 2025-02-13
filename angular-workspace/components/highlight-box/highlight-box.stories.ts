import { moduleMetadata, storiesOf } from "@storybook/angular";

import { storiesOfHighlightBox } from "dso-toolkit";

import { DsoHighlightBox, DsoIcon } from "../../projects/component-library/src/public-api";
import { templateContainer } from "../../templates";
import { content } from "./highlight-box.content";

import readme from "./readme.md?raw";

storiesOfHighlightBox({
  parameters: {
    module,
    storiesOf,
    readme,
    storyApiOptions: {
      decorators: [
        moduleMetadata({
          declarations: [DsoIcon],
        }),
      ],
      parameters: [
        {
          component: DsoHighlightBox,
        },
      ],
    },
  },
  templateContainer,
  storyTemplates: ({ highlightBoxTemplate }) => ({ highlightBoxTemplate, content: content() }),
});
