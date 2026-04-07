import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { SearchBar } from "./SearchBar";

describe('SearchBar', () => {
    test('should render searchbar correctly', () => {
        const { container } = render(<SearchBar onQuery={() => { }} />);
        expect(container).toMatchSnapshot();
    })

    test('should calll onQuery with the correct value after 700ms', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {
            target: {
                value: 'test'
            },
        });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalled();
            expect(onQuery).toHaveBeenCalledWith('test')
        })
    })

})
