const showError = (errorMessage: string, setErrorMessage: React.Dispatch<React.SetStateAction<string>>) => {
    setErrorMessage(errorMessage);
    setTimeout(() => setErrorMessage(""), 3000);
}

export default showError