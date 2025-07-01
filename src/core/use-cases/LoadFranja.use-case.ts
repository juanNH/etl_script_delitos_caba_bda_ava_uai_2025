import { FranjaRepository } from '../../infrastructure/repositories/FranjaRepository';
import { Franja } from '../entities/Franja.entity';

export class LoadFranjaUseCase {
    private franjaRepository: FranjaRepository;
    private franjasHoras: string[] = [
        '00hs-01hs',
        '01hs-02hs',
        '02hs-03hs',
        '03hs-04hs',
        '04hs-05hs',
        '05hs-06hs',
        '06hs-07hs',
        '07hs-08hs',
        '08hs-09hs',
        '09hs-10hs',
        '10hs-11hs',
        '11hs-12hs',
        '12hs-13hs',
        '13hs-14hs',
        '14hs-15hs',
        '15hs-16hs',
        '16hs-17hs',
        '17hs-18hs',
        '18hs-19hs',
        '19hs-20hs',
        '20hs-21hs',
        '21hs-22hs',
        '22hs-23hs',
        '23hs-24hs'
    ];

    constructor(franjaRepository: FranjaRepository) {
        this.franjaRepository = franjaRepository;
    }

    async execute(): Promise<void> {
        const franjas: Franja[] = this.franjasHoras.map(franja => {
            const franjaEntitiy = new Franja()
            franjaEntitiy.franja = franja
            return franjaEntitiy;
        })
        await this.franjaRepository.saveMany(franjas)
    }
}
