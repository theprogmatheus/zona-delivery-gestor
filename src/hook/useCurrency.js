const useCurrency = () => {

    const formatCurrency = (value) => {
        const absValue = Math.abs(value);
        return ((value < 0) ? "- R$ " : "R$ ") + absValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return {
        formatCurrency
    }
}
export default useCurrency;