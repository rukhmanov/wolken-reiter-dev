import { trigger, style, transition, animate, query, animateChild, group } from '@angular/animations';

export enum AnimationRoutingNames {
  MAIN_PAGE = "mainPage",
  LOGIN = "login",
  SIGNUP = "signup",
}

export const animations = {
  animOpacity: trigger('animOpacity', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.4s', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      animate('.4s', style({ opacity: 0 })),
    ]),
  ])
}

export const routeChangeAnimation = trigger(
  'routeChangeAnimation',
  [
    transition('* => *', [
      query(
        ':enter',
        [style({ opacity: 0 })],
        { optional: true }
      ),
      query(
        ':leave',
         [style({
           opacity: 1,
           }), animate('0.3s', style({ opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({
          opacity: 0,
          position: 'absolute'
         }), animate('0.3s', style({ opacity: 1 }))],
        { optional: true }
      )
    ])
  ]
)

