import { useState } from "react"
import { useForm } from "react-hook-form"
import { inAxios } from "../config_axios";


const Inclusao = () => {

    const { register, handleSubmit, reset } = useForm();

    const [aviso, setAviso] = useState("");

    const salvar = async (campos) => {
        try {
            const response = await inAxios.post("ordens", campos);
            setAviso(`Ordem de serviço n° ${response.data.id} cadastrada com sucesso`);
        } catch (error) {
            setAviso(`Erro... Ordem de serviço não cadastrada: ${error}`)            
        }

        setTimeout(() => {
            setAviso("");
        }, 5000);

        reset({modelo: "", serie: "", tipo: "", descricao: "", observacao: ""});
    };   

    return (
        <div className="container">
            <h4 className="fst-italic mt-3 text-center">Cadastro de Ordem de Serviço</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="from-group">
                    <label htmlFor="modelo">Modelo do Equipamento:</label>
                    <input type="text" className="form-control" id="modelo" required 
                    autoFocus {...register("modelo")} />
                </div>
                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="serie">Numero de serie:</label>
                            <input type="text" className="form-control" id="serie" required {...register("serie")} />
                        </div>                       
                    </div>
                    <div className="col-sm-8">
                        <div className="form-group">
                            <label htmlFor="tipo">Tipo de Manutenção</label>
                            <select className="form-control" id="tipo" name="tipo" {...register("tipo")}>
                                <option value="corretiva">Corretiva</option>
                                <option value="preventiva">Preventiva</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea className="form-control" rows="4" cols="50" placeholder="Descrição..." id="descricao" required {...register("descricao")} />
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="observacao">Observações:</label>
                    <input type="textarea" className="form-control" id="observacao" required {...register("observacao")} />
                </div>
                <input type="submit" className="btn btn-primary mt-3" value="Salvar"></input>
                <input type="reset" className="btn btn-danger mt-3 ms-3" value="Limpar"></input>
            </form>
            <div className={aviso.startsWith("Ok!") ? "alert alert-success" : 
                aviso.startsWith("Erro") ? "alert alert-danger" : ""}> {aviso}
            </div>
        </div>
    );
};
export default Inclusao;