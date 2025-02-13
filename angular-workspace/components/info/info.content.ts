import { StoryFnAngularReturnType } from "@storybook/angular/dist/client/types";

export function richContent(): StoryFnAngularReturnType {
  return {
    template: `
      <div class="dso-rich-content">
        <h2>Heading 2</h2>
        <p>
          Lorem ipsum dolor sit amet, <strong>consectetur</strong> adipiscing elit. Nullam non metus dolor. Pellentesque
          velit arcu, pellentesque at lacus sit amet, porta semper est. Praesent mollis lorem lorem, non varius nisl
          lacinia et. Integer quis sollicitudin arcu. <a href="#">Nullam</a> lacinia non ipsum sit amet varius. Praesent
          consequat ligula id tortor elementum pretium. Integer ligula justo, volutpat sed tellus eu, faucibus fringilla
          lectus.
        </p>

        <div class="dso-button-row">
          <a href="#" class="dso-primary"><span>Primaire button</span></a>
          <a href="#" class="dso-secondary"><span>Secundaire button</span></a>
          <a href="#" class="dso-tertiary">
            <span>Tertiaire button</span>
            <dso-icon icon="chevron-down"></dso-icon>
          </a>
        </div>
      </div>
    `,
  };
}
