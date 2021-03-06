import { interval, Subject } from 'rxjs';
import { myTakeUntil } from './takeUntil';
import { takeUntil } from 'rxjs/operators';

test('create our own takeUntil operator', (done) => {
    const stop$ = new Subject();
    setTimeout(() => stop$.next(), 45);
    const expectedResult = [0, 1, 2];

    interval(10).pipe(
        takeUntil(stop$)
    ).subscribe(val => {
            const expected = expectedResult.shift();
            expect(val).toBe(expected);
        },
        (err: any) => {
            console.log('');
        },
        () => {
            expect(expectedResult.length).toBe(0);
            done();
        }
    );
});