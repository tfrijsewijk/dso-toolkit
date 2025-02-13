import { h, Fragment } from "@stencil/core";

import { OzonContentNodeContext } from "../ozon-content-node-context.interface";
import { OzonContentNode } from "../ozon-content-node.interface";

export class OzonContentOpschriftNode implements OzonContentNode {
  name = "Opschrift";

  render(node: Element, { mapNodeToJsx }: OzonContentNodeContext) {
    let content = mapNodeToJsx(node.childNodes);
    const wijzigactie = node.getAttribute("wijzigactie");

    if (wijzigactie === "voegtoe") {
      content = <ins class="nieuwe-tekst">{content}</ins>;
    } else if (wijzigactie === "verwijder") {
      content = <del class="verwijderde-tekst">{content}</del>;
    }

    return <>{content}</>;
  }
}
