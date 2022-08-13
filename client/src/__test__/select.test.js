import React from 'react';
import { render, fireEvent, cleanup, screen, within, configure, waitForElement, waitFor } from '@testing-library/react';


import '@testing-library/jest-dom/extend-expect';
import Single from '../components/single/Single';

afterEach(cleanup);

describe('Test react-select component', () => {

    const mockedOptions = [
        { label: 'Mocked option 1', value: 'mocked-option-1' },
        { label: 'Mocked option 2', value: 'mocked-option-2' },
        { label: 'Mocked option 3', value: 'mocked-option-3' },
        { label: 'Mocked option 4', value: 'mocked-option-4' },
        { label: 'Mocked option 5', value: 'mocked-option-5' },
        { label: 'Mocked option 6', value: 'mocked-option-6' },
        { label: 'Mocked option 7', value: 'mocked-option-7' },
        { label: 'Mocked option 8', value: 'mocked-option-8' },
        { label: 'Mocked option 9', value: 'mocked-option-9' },
        { label: 'Mocked option 10', value: 'mocked-option-10' },
    ];

    it('should render without errors', async () => {
        const mockedOnChange = jest.fn();
        const mockedOnInputChange = jest.fn();
        render(<Single
            options={mockedOptions}
            onChange={mockedOnChange}
            onInputChange={mockedOnInputChange} />
        );

        const placeholder = screen.getByText('Select an option');

        expect(placeholder).toBeTruthy();

    });

    it('should call onChange when the first option is selected through typing', async () => {
        const mockedOnChange = jest.fn();
        const mockedOnInputChange = jest.fn();
        const { getByTestId, queryByTestId } = render(<Single
            options={mockedOptions}
            onChange={mockedOnChange}
            onInputChange={mockedOnInputChange}
        />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);

        const field = getByTestId('my-select-component').querySelector('input');
        //test 1
        fireEvent.change(field, { target: { value: 2 } });
        fireEvent.click(screen.getByText('Mocked option 2'));
        expect(screen.getByText('Mocked option 2')).toBeInTheDocument();
        expect(mockedOnChange).toHaveBeenCalledTimes(1);

    });


    it('should call onChange when the second option is selected through down arrow key', async () => {
        const mockedOnChange = jest.fn();
        const mockedOnInputChange = jest.fn();
        const { getByTestId, queryByTestId } = render(<Single
            options={mockedOptions}
            onChange={mockedOnChange}
            onInputChange={mockedOnInputChange}
        />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);


        fireEvent.keyDown(mySelectComponent.firstChild, { key: 'ArrowDown' });
        await waitFor(() => {
            expect(screen.getByText('Mocked option 1')).toBeInTheDocument();
        });
        fireEvent.click(screen.getByText('Mocked option 1'));
        expect(screen.getByText('Mocked option 1')).toBeInTheDocument();
        expect(mockedOnChange).toHaveBeenCalledTimes(1);

    });

    it('should not allow non-existent option selected through typing', async () => {
        const mockedOnChange = jest.fn();
        const mockedOnInputChange = jest.fn();
        const { getByTestId, queryByTestId } = render(<Single
            options={mockedOptions}
            onChange={mockedOnChange}
            onInputChange={mockedOnInputChange}
        />);

        const mySelectComponent = queryByTestId('my-select-component');

        expect(mySelectComponent).toBeDefined();
        expect(mySelectComponent).not.toBeNull();
        expect(mockedOnChange).toHaveBeenCalledTimes(0);

        const field = getByTestId('my-select-component').querySelector('input');
        //test 1
        fireEvent.change(field, { target: { value: 50 } });
        expect(screen.getByText('No options')).toBeInTheDocument();
        

    });

 



});