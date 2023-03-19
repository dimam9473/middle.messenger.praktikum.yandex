import Block from "../components/block/block";

export function render(query: string, block: Block) {
    const root = document.querySelector(query);
    const content = block.getContent()

    if (content) {
        root?.appendChild(content);
    }

    return root;
}
