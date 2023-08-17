export default function transformRadix2(real, imag) {
    // Length variables
    const n = real.length;
    if (n != imag.length)
        throw new RangeError("Mismatched lengths");
    if (n == 1) // Trivial transform
        return;
    let levels = -1;
    for (let i = 0; i < 32; i++) {
        if (1 << i == n)
            levels = i; // Equal to log2(n)
    }
    if (levels == -1)
        throw new RangeError("Length is not a power of 2");
    // Trigonometric tables
    let cosTable = new Array(n / 2);
    let sinTable = new Array(n / 2);
    for (let i = 0; i < n / 2; i++) {
        cosTable[i] = Math.cos(2 * Math.PI * i / n);
        sinTable[i] = Math.sin(2 * Math.PI * i / n);
    }
    // Bit-reversed addressing permutation
    for (let i = 0; i < n; i++) {
        const j = reverseBits(i, levels);
        if (j > i) {
            let temp = real[i];
            real[i] = real[j];
            real[j] = temp;
            temp = imag[i];
            imag[i] = imag[j];
            imag[j] = temp;
        }
    }
    // Cooley-Tukey decimation-in-time radix-2 FFT
    for (let size = 2; size <= n; size *= 2) {
        const halfsize = size / 2;
        const tablestep = n / size;
        for (let i = 0; i < n; i += size) {
            for (let j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
                const l = j + halfsize;
                const tpre = real[l] * cosTable[k] + imag[l] * sinTable[k];
                const tpim = -real[l] * sinTable[k] + imag[l] * cosTable[k];
                real[l] = real[j] - tpre;
                imag[l] = imag[j] - tpim;
                real[j] += tpre;
                imag[j] += tpim;
            }
        }
    }
    // Returns the integer whose value is the reverse of the lowest 'width' bits of the integer 'val'.
    function reverseBits(val, width) {
        let result = 0;
        for (let i = 0; i < width; i++) {
            result = (result << 1) | (val & 1);
            val >>>= 1;
        }
        return result;
    }
}