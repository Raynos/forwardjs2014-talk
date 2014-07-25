## Slide 1

Hey guys, today's talk is going to be about unidirectional
web apps.

A little about me, I'm @Raynos, I've been trying to achieve
the holy grail of what I call "zero bullshit webapps". That
means I want to express my web app with just essential complexity.

Basically a web app should have no accidental complexity, i.e.
no framework boilerplate, no DOM bullshit, no jQuery or div soup,
no nothing.

Today I'll be talking about the idea of a unidirectional app
and I'll be talking about reference implementation called mercury.

## Slide 1.5

Today I'll be talking about what a unidirectional app is, I'm
not allowed to use that word unless I explain it.

We'll take a look at the strengths of it and we'll compare it
existing MV* and FRP solutions, then finally if there's time
we'll build a quick app with some small modules.

## Slide 2

So a bit of history, the first time i saw the term unidirectional
was when i saw a presentation about Flux by react engineers.

Basically we are talking about application with single direction
data flow. This means there is no two way data binding.

Two way data binding is a technique used by Angular,
Ember and Knockout

## Slide 3
