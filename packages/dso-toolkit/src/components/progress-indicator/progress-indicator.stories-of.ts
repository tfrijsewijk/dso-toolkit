import { StoriesOfArguments, storiesOfFactory } from "../../storybook/index.js";

import {
  ProgressIndicatorArgs,
  progressIndicatorArgsMapper,
  progressIndicatorArgTypes,
} from "./progress-indicator.args.js";
import { ProgressIndicator } from "./progress-indicator.models.js";

export interface ProgressIndicatorTemplates<TemplateFnReturnType> {
  progressIndicatorTemplate: (progressIndicatorProperties: ProgressIndicator) => TemplateFnReturnType;
}

export function storiesOfProgressIndicator<Implementation, Templates, TemplateFnReturnType>(
  storiesOfArguments: StoriesOfArguments<
    Implementation,
    Templates,
    TemplateFnReturnType,
    ProgressIndicatorTemplates<TemplateFnReturnType>
  >,
) {
  return storiesOfFactory("Progress Indicator", storiesOfArguments, (stories, templateMapper) => {
    stories.addParameters({
      argTypes: progressIndicatorArgTypes,
    });

    const template = templateMapper<ProgressIndicatorArgs>((args, { progressIndicatorTemplate }) =>
      progressIndicatorTemplate(progressIndicatorArgsMapper(args)),
    );

    stories.add("small", template, {
      args: {
        size: "small",
      },
    });

    stories.add("medium", template, {
      args: {
        size: "medium",
      },
    });

    stories.add("large", template, {
      args: {
        size: "large",
      },
    });

    return stories;
  });
}
