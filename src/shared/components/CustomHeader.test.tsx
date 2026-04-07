import { describe, expect, test } from "vitest";
import { CustomHeader } from "./CustomHeader";
import { render, screen } from "@testing-library/react";

describe('CustomHeader', () => {
    const title = 'Test title';

    test('Should render the title correctly', () => {
        render(<CustomHeader title={title} />)
        expect(screen.getByText(title)).toBeDefined();
    });

    test('Should render the description when provided', () => {
        const description = 'Test description';
        render(<CustomHeader title={title} description={description} />);
        expect(screen.getByText(description)).toBeDefined();
        expect(screen.getByRole('paragraph')).toBeDefined();
        expect(screen.getByRole('paragraph').innerHTML).toBe(description);
    });

    test('Should not render description when is not provided', () => {
        const { container } = render(<CustomHeader title={title} />);

        const divElemet = container.querySelector('.content-center');
        
        const h1 = divElemet?.querySelector('h1');
        expect(h1?.innerHTML).toBe(title);

        const p = divElemet?.querySelector('p');
        console.log(p?.innerHTML)
        expect(p?.innerHTML).toBe("");
    });
});