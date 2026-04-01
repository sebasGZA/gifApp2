import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import { GifsApp } from './GifsApp'

describe('GifsApp', () => {

    test('Should match snapshot', () => {
        const { container } = render(<GifsApp />)

        expect(container).toMatchSnapshot()
    })
})