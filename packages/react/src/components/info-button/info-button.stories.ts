import { storiesOfInfoButton } from "dso-toolkit";
import { storiesOf } from "@storybook/react";
import { templateContainer } from "../../templates";

import readme from "./readme.md?raw";

storiesOfInfoButton({
  parameters: {
    module,
    storiesOf,
    readme,
  },
  templateContainer,
  storyTemplates: ({ infoButtonTemplate }) => ({ infoButtonTemplate }),
});
