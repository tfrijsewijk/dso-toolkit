import {
  Component,
  ComponentInterface,
  Prop,
  h,
  FunctionalComponent,
  Element,
  Event,
  EventEmitter,
  State,
  Fragment,
  Listen,
} from "@stencil/core";
import clsx from "clsx";
import {
  AdvancedSelectGroup,
  AdvancedSelectGroupRedirect,
  AdvancedSelectOption,
  AdvancedSelectChangeEvent,
  AdvancedSelectOptionOrGroup,
  AdvancedSelectRedirectEvent,
} from "./advanced-select.models";
import { createFocusTrap, FocusTrap } from "focus-trap";
import { tabbable } from "tabbable";
import { isModifiedEvent } from "../../utils/is-modified-event";

@Component({
  tag: "dso-advanced-select",
  styleUrl: "advanced-select.scss",
  shadow: true,
})
export class AdvancedSelect implements ComponentInterface {
  private trap?: FocusTrap;

  @Element()
  host!: HTMLDsoAdvancedSelectElement;

  /**
   * The options to display in the select.
   */
  @Prop()
  options: AdvancedSelectOptionOrGroup<never>[] = [];

  /**
   * The active option. By object reference.
   */
  @Prop()
  active?: AdvancedSelectOption<never>;

  /**
   * An extra text for the active option. Only visible in the list of options.
   */
  @Prop()
  activeHint?: string;

  /**
   * The open state of the options list.
   */
  @State()
  open: boolean = false;

  /**
   * Emitted when user selects an option
   */
  @Event({ bubbles: false })
  dsoChange!: EventEmitter<AdvancedSelectChangeEvent<never>>;

  /**
   * Emitted when user activates a group redirect link.
   */
  @Event({ bubbles: false })
  dsoRedirect!: EventEmitter<AdvancedSelectRedirectEvent>;

  private toggleButtonElementRef: HTMLButtonElement | undefined;

  @Listen("keydown", { target: "window" })
  keyDownListener(event: KeyboardEvent) {
    if (this.open && event.key === "ArrowUp") {
      event.preventDefault();
      this.handleTab(-1);
    } else if (this.open && event.key === "ArrowDown") {
      event.preventDefault();
      this.handleTab(1);
    }
  }

  componentDidRender() {
    if (this.open && !this.trap) {
      this.createTrap();
    } else if (!this.open && this.trap) {
      this.removeTrap();
    }
  }

  private toggleOpen = () => {
    this.open = !this.open;
  };

  private createTrap() {
    this.trap = createFocusTrap(this.host, {
      clickOutsideDeactivates: true,
      escapeDeactivates: true,
      setReturnFocus: this.toggleButtonElementRef,
      tabbableOptions: {
        getShadowRoot: true,
      },
      onDeactivate: () => {
        this.open = false;
      },
    }).activate();
  }

  private removeTrap() {
    this.trap?.deactivate();
    delete this.trap;
  }

  private handleTab(direction: number) {
    const elements = tabbable(this.host, { getShadowRoot: true });
    const currentIndex = elements.findIndex((e) => e === this.host.shadowRoot?.activeElement);

    let nextIndex = currentIndex + direction;
    if (nextIndex >= elements.length) {
      nextIndex = 0;
    } else if (nextIndex < 0) {
      nextIndex = elements.length - 1;
    }

    elements[nextIndex]?.focus();
  }

  private handleOptionClick = (event: MouseEvent, option: AdvancedSelectOption<never>) => {
    this.dsoChange.emit({ originalEvent: event, option });
    this.open = false;
  };

  private handleRedirectClick = (event: MouseEvent, redirect: AdvancedSelectGroupRedirect) => {
    this.dsoRedirect.emit({ originalEvent: event, isModifiedEvent: isModifiedEvent(event), redirect });
    this.open = false;
  };

  render() {
    return (
      <>
        <button
          aria-expanded={this.open.toString()}
          class={clsx(["active-option", { open: this.open }])}
          type="button"
          onClick={this.toggleOpen}
          ref={(element) => (this.toggleButtonElementRef = element)}
        >
          <span class="active-option-label">{this.active?.label ?? "Selecteer een optie"}</span>
          <span class="active-option-aside">
            {this.options.some(
              (optionOrGroup) => "summaryCounter" in optionOrGroup && optionOrGroup?.summaryCounter,
            ) && (
              <span class="badges">
                {this.options
                  .filter(
                    (option): option is AdvancedSelectGroup<never> =>
                      "options" in option && "summaryCounter" in option && !!option?.summaryCounter,
                  )
                  .map((group) => {
                    return <dso-badge status={group.variant ?? "outline"}>{group.options.length}</dso-badge>;
                  })}
              </span>
            )}
            <dso-icon icon="caret-down"></dso-icon>
          </span>
        </button>
        {this.open && (
          <div class="groups-container">
            <ul class="groups">
              {this.options.map((optionOrGroup) =>
                "options" in optionOrGroup ? (
                  <li class={clsx(["group", { [`group-${optionOrGroup.variant}`]: !!optionOrGroup.variant }])}>
                    {optionOrGroup.label && <p class="group-label">{optionOrGroup.label}</p>}
                    <ul class="options">
                      {optionOrGroup.options.map((option) => (
                        <OptionElement
                          option={option}
                          active={this.active}
                          activeHint={this.activeHint}
                          callback={this.handleOptionClick}
                        />
                      ))}
                    </ul>
                    {optionOrGroup.redirect && (
                      <a
                        class="group-link"
                        href={optionOrGroup.redirect.href}
                        onClick={(e) => optionOrGroup.redirect && this.handleRedirectClick(e, optionOrGroup.redirect)}
                      >
                        {optionOrGroup.redirect.label}
                        <dso-icon icon="chevron-right"></dso-icon>
                      </a>
                    )}
                  </li>
                ) : (
                  <OptionElement
                    option={optionOrGroup}
                    active={this.active}
                    activeHint={this.activeHint}
                    callback={this.handleOptionClick}
                  />
                ),
              )}
            </ul>
          </div>
        )}
      </>
    );
  }
}

const OptionElement: FunctionalComponent<{
  option: AdvancedSelectOption<never>;
  active: AdvancedSelectOption<never> | undefined;
  activeHint: string | undefined;
  callback: (event: MouseEvent, value: AdvancedSelectOption<never>) => void;
}> = ({ option, active, activeHint, callback }) => (
  <li>
    <button
      class={clsx(["option", { "option-active": active === option }])}
      type="button"
      onClick={(e) => callback(e, option)}
    >
      <span class="option-label">{option.label}</span>
      {!!activeHint && active === option && <span class="option-hint">({activeHint})</span>}
    </button>
  </li>
);
