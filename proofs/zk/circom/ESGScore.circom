pragma circom 2.0.0;

include "node_modules/circomlib/circuits/comparators.circom";

template ESGScore() {
    signal input score; // Private input
    signal output isCompliant; // Public output (1 if score >= 80, 0 otherwise)

    component gte = GreaterEqThan(8); // 8-bit comparison (covers 0-255)
    
    gte.in[0] <== score;
    gte.in[1] <== 80;

    isCompliant <== gte.out;
}

component main = ESGScore();
