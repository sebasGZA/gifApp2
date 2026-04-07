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

    test('should call only once with the last value(debounce)', async () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {
            target: {
                value: 'test'
            },
        });
        fireEvent.change(input, {
            target: {
                value: 't'
            },
        });

        await waitFor(() => {
            expect(onQuery).toHaveBeenCalledTimes(1);
            expect(onQuery).toHaveBeenCalledWith('t')
        })
    })

    test('should  call onQuery when buttom clicked with input value', () => {
        const onQuery = vi.fn();
        render(<SearchBar onQuery={onQuery} />);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {
            target: {
                value: 'test'
            },
        });

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(onQuery).toHaveBeenCalled();
    })

    test('should the input has the coorect placeholder value', () => {
        render(<SearchBar onQuery={() => { }} placeholder="Search gifs" />)

        expect(screen.getByPlaceholderText('Search gifs')).toBeDefined()
    })




})
