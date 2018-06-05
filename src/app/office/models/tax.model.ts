import { ITax } from "../interfaces/tax.interface";

export class Tax implements ITax {
    company = null;
    _month = null;
    _year = null;
    _fss = null;
    _fss_ns = null;
    _foms = null;
    _pfr = null;
    _ndfl = null;
    _envd = null;
    _usn = null;
    _nds = null;
    _profit_fb = null;
    _profit_rf = null;
    comment = null;
}