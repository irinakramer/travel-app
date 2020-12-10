import { checkInput } from "../src/client/js/inputCheck"

describe("Testing that user input is a string", () => {
    test("testing regexp for non alpha characters", () => {
        let regexp = /^[a-zA-Z\s]{0,255}$/;
        let input = "par1s";
        expect(regexp.test(input)).toBe(false);
    });
    test("testing regexp for alpha characters", () => {
        let regexp = /^[a-zA-Z\s]{0,255}$/;
        let input = "paris";
        expect(regexp.test(input)).toBe(true);
    });
});