import { DocumentComponent } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

export const coreDocumentComponent: ComponentImplementation<DocumentComponent<TemplateResult>> = {
  component: "documentComponent",
  implementation: "core",
  template: () =>
    function documentComponentTemplate({
      alternativeTitle,
      annotated,
      bevatOntwerpInformatie,
      children,
      dsoAnnotationToggle,
      dsoToggle,
      filtered,
      genesteOntwerpInformatie,
      gereserveerd,
      heading,
      inhoud,
      label,
      notApplicable,
      nummer,
      open,
      openAnnotation,
      opschrift,
      type,
      vervallen,
      wijzigactie,
      content,
      mark,
      dsoMarkItemHighlight,
    }) {
      return html`<dso-responsive-element>
        <dso-document-component
          ?annotated=${annotated}
          ?bevat-ontwerp-informatie=${bevatOntwerpInformatie}
          ?filtered=${filtered}
          ?geneste-ontwerp-informatie=${genesteOntwerpInformatie}
          ?gereserveerd=${gereserveerd}
          ?not-applicable=${notApplicable}
          ?open=${open}
          ?open-annotation=${openAnnotation}
          ?vervallen=${vervallen}
          .alternativeTitle=${ifDefined(alternativeTitle)}
          .heading=${heading}
          .inhoud=${ifDefined(inhoud)}
          .nummer=${ifDefined(nummer)}
          .opschrift=${ifDefined(opschrift)}
          .label=${ifDefined(label)}
          .type=${type}
          .wijzigactie=${ifDefined(wijzigactie)}
          .mark=${ifDefined(mark)}
          @dsoMarkItemHighlight=${ifDefined(dsoMarkItemHighlight)}
          @dsoAnnotationToggle=${ifDefined(dsoAnnotationToggle)}
          @dsoToggle=${ifDefined(dsoToggle)}
        >
          ${open && content ? unsafeHTML(content) : nothing}${children}
        </dso-document-component>
      </dso-responsive-element>`;
    },
};
