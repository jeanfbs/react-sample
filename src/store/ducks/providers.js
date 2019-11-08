
import { 
    ApiResponseResolver,
    AuthService, 
    EstablishmentService,
    CadastralDetailsService
} from "../../services";

const apiResponseResolver = new ApiResponseResolver();
const initialState = {
    authService: new AuthService(apiResponseResolver),
    establishmentService: new EstablishmentService(apiResponseResolver),
    cadastralDetailsService: new CadastralDetailsService(apiResponseResolver)
}

export default function reducer(){
    return initialState;
} 