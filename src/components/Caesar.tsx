import { useState } from "react"
import Select from "./Select";

const Caesar = () => {
    
    const [output, setOutput] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

    const API = "https://caesar-10qk.onrender.com/";

    const disableShift = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const algorithm = event.currentTarget.value
        const action = document.querySelector("select[name='choose-action']") as HTMLSelectElement
        const shift = document.querySelector("input[name='shift']")
        if (algorithm === "rot13" || algorithm === "atbash") {
            shift?.setAttribute("disabled", "true")
            action.setAttribute("disabled", "true")
        } else {
            shift?.removeAttribute("disabled")
            action.removeAttribute("disabled")
        }
    }

    const encrypt = async (text: string, shift: number, action: string, algorithm: string) => {
        const payload = { "text": text, "shift": shift, "option": action };
        const headers = { "Content-Type": "application/json" };

        const response = await fetch(`${API + algorithm}/`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        });
        const data = await response.json()
        return data.message
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true)
        e.preventDefault()
        const text = e.currentTarget["text-input"].value
        const shift = parseInt(e.currentTarget["shift"].value)
        const algorithm = e.currentTarget["algorithm"].value
        const action = e.currentTarget["choose-action"].value
        try {
            let result = await encrypt(text, shift, action, algorithm)
            setOutput(result)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    
    return (
        
        <>
            {loading && <div className="loader-container"> <span id="loader"></span></div>}
            <form onSubmit={handleSubmit}>
                <input name="text-input" type="text" placeholder="Enter text to encrypt here"></input>
                <input name="shift" type="number" placeholder="Enter shift value here"></input>
                <div id="select">
                    <Select 
                        name="algorithm" 
                        options={
                            [
                            { key: "Caesar", value: "caesar" },
                            { key: "ROT13", value: "rot13" },
                            { key: "CRot13", value: "crot13"},
                            { key: "Atbash", value: "atbash" }
                        ]}
                        defaultValue="caesar"
                        onChange={disableShift}
                    />
                    <Select 
                        name="choose-action" 
                        options={
                            [
                            { key: "Encrypt", value: "encrypt" },
                            { key: "Decrypt", value: "decrypt" }
                        ]}
                    />
                </div>
                <button type="submit">Encrypt</button>
            </form>


            <div id="output">
                <h2>Output:</h2>
                <p>{output === "" ? "Output will be displayed Here" : output}</p>
            </div>
        </>
    )
}

export default Caesar