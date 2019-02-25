import { Observable, Observer, Subscription } from 'rxjs';

export const mySwitchMap = <T>(project: (n: T) => Observable<any>) =>
    (source: Observable<T>) =>
        new Observable((observer: Observer<T>) => {
            let innerSubscription: Subscription;
            const subscription = new Subscription();
            subscription.add(source.subscribe(
                (next: T) => {
                    innerSubscription && innerSubscription.unsubscribe();
                    const inner$ = project(next);
                    innerSubscription = inner$.subscribe(
                        (next: T) => observer.next(next),
                        (err: any) => observer.error(err),
                    );
                    subscription.add(innerSubscription);
                },
                (err: any) => observer.error(err),
                () => observer.complete(),
                )
            );
            return subscription;
        });