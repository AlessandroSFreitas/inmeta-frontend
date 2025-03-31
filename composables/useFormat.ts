export default function () {
    const diferencaEmDias = ref(0);

    const diasPassados = (date: Date) => {
        // debugger
        const dataAtual = new Date().getTime();

        const diferencaEmMilissegundos = dataAtual - date.getTime();

        diferencaEmDias.value = Math.floor(
            diferencaEmMilissegundos / (1000 * 60 * 60 * 24)
        );
    };

    return { diasPassados, diferencaEmDias };
}