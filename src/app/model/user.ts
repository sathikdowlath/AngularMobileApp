export class User {
    id?: string;
    userName?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    role?:string;
}

export class Medicine {
    id?: string;
    medicineName?: string;    
}

export class Prescription {
    temperature ? : string;
    pulse ? : string;
    remarks ? : string;
    medicines ? : AddMedicine[];
    appointmentId ? : string;
    id? : string;
}

export class AddMedicine {
    medicineName ? : string;
    morning ? : boolean;
    noon ? : boolean;
    night ? : boolean;

}

export class AppointmentWithPrecription {
    Appointment? : Appointment;
    Prescription? : Prescription;
}

export class Appointment {
    id? : string;
    appointmentDate ? : string;
    appointmentTime ? : string;
    doctorId  ? : string;
    patientId  ? : string;
    reasonForVisit ? : string;
    doctorName ? :  string;
    status? :  string;
    prescriptionId ? : string;
}

export class Doctor {
    id?: string;    
    firstName?: string;
    lastName?: string;
    specialist?:string;
    degree?:string;    
    userName?: string;
    password?: string;    
    role?:string;
}
      