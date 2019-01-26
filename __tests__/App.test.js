import React from 'react';
import App from '../App';
import { mount, shallow } from 'enzyme';
import {LayoutAnimation} from 'react-native';
jest.mock('LayoutAnimation');

let wrapper;
let state;
let spy;
describe('App Component', () => {
    beforeEach(() => {
        wrapper = shallow(<App />);
        state = wrapper.state();
    });

    it('should renders correctly without breaking', () => {
        expect(wrapper).toBeTruthy();
    });
    it('should renders three TextInputs', () => {
        expect(wrapper.find("TextInput")).toHaveLength(3);
    });

    it('should matche snapshot', () => {
        expect(wrapper).toMatchSnapshot();
    });

    describe('Initialization', () => {
        it('should call determineTriangleTypeAndSides', () => {
            spy = jest.spyOn(wrapper.instance(), 'determineTriangleTypeAndSides')
            wrapper.instance().componentDidMount()
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Method determineTriangleTypeAndSides', () => {
        beforeEach(() => {
            wrapper.instance().determineTriangleTypeAndSides();
        });

        it('should call inputIsNonZero', () => {
            spy = jest.spyOn(wrapper.instance(), 'inputIsNonZero')
            wrapper.instance().determineTriangleTypeAndSides();
            expect(spy).toHaveBeenCalled();
        });

        describe('calculates type of triangle', () => {
            it('should determine an equilateral has all equal sides', async () => {
                await wrapper.setState({
                    inputs: {
                        first: '20',
                        second: '20',
                        third: '20',
                    }
                })
                await wrapper.instance().determineTriangleTypeAndSides();
                state = wrapper.state();
                expect(state.triangleTypes).toBe('equilateral');
            });

            it('should determine an isosceles if two sides are equal', async () => {
                await wrapper.setState({
                    inputs: {
                        first: '20',
                        second: '30',
                        third: '20',
                    }
                })
                await wrapper.instance().determineTriangleTypeAndSides();
                state = wrapper.state();
                expect(state.triangleTypes).toBe('isosceles');
            });

            it('should determine an scalene if no sides are equal', async () => {
                await wrapper.setState({
                    inputs: {
                        first: '20',
                        second: '30',
                        third: '10',
                    }
                })
                await wrapper.instance().determineTriangleTypeAndSides();
                state = wrapper.state();
                expect(state.triangleTypes).toBe('scalene');
            });
        })

        describe('updates state', () => {
            it('should calculate hypotenuse', () => {
                expect(state.hypotenuse).toEqual('30');
            });

            it('should make hyptoenuse the longest side', () => {
                expect(parseInt(state.hypotenuse)).toBeGreaterThanOrEqual(parseInt(state.side1));
                expect(parseInt(state.hypotenuse)).toBeGreaterThanOrEqual(parseInt(state.side2));
            });

            it('should calculate triangleTypes', () => {
                expect(state.triangleTypes).toEqual('isosceles');
            });

            it('should calculate side1', () => {
                expect(state.side1).toEqual('20');
            });

            it('should calculate side2', () => {
                expect(state.side2).toEqual('20');
            });
        });
    });

    describe('Method inputIsNonZero', () => {
        it('should return false if input is zero', () => {
            let inputs = {...state.inputs}
            inputs['side1'] = "0";
            wrapper.setState({inputs});
            const doesNotHaveZero = wrapper.instance().inputIsNonZero();
            expect(doesNotHaveZero).toBeFalsy();
        });

        it('should return false if inputs are non-zero', () => {
            let inputs = {...state.inputs}
            inputs['side1'] = "30";
            wrapper.setState({inputs});
            const doesNotHaveZero = wrapper.instance().inputIsNonZero();
            expect(doesNotHaveZero).toBeTruthy();
        });
    });

    describe('method dynamicStyling', () => {
        beforeEach(() => {
            wrapper.instance().dynamicStyling();
        });
        it('should have animations', () => {
            expect(LayoutAnimation.easeInEaseOut).toHaveBeenCalled();
        });

        it('should parse strings to numbers', () => {
            Object.values(wrapper.instance().dynamicStyling()).forEach((value) => {
                expect(typeof value).toBe('number');
            })
        })
    });

    describe('handleChange', () => {
        beforeEach(async () => {
            spy = jest.spyOn(wrapper.instance(), 'determineTriangleTypeAndSides');
            await wrapper.instance().handleChange('first', '40');
            state = wrapper.state();
        });

        it('should only change one state at a time', () => {
            expect(state.inputs.first).toBe('40');
            expect(state.inputs.second).toBe('30');
            expect(state.inputs.third).toBe('20');
        });
        it('should call determineTriangleTypeAndSides', () => {
            expect(spy).toHaveBeenCalled();
        });
    })
});
