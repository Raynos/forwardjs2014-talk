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

The trick to a unidirectional app is that it's a big cycle.

You can start anywhere in the cycle, but let's start with the
state. The first thing you do is you model the state of your
application, i.e. everything needed to render.

The next step is the `Render` function, you just write a render
function that converts your application state into a visual
scene. Normally this is represented as a virtual DOM tree.

That's half of it, the other half is you have to decide what
type of logical user interactions can occur and you want to
set up a bunch of named inputs, one for each logical user
interaction, then when a raw DOM event comes it, the delegator
dispatches it to the correct input and you just run some update
logic to update your state.

You now have a new state and a re-render gets triggered and the
cycle never ends.

## Slide 4

So a unidirectional app is pretty simple, but that's not what
I wanted to talk about.

What I really want to talk about is a subset of unidirectional
apps, i.e. immutable unidirectional apps.

So as we mentioned a unidirectional app has no two way data
binding that you might find between a model and a view in
something like angular or ember or knockout.

Now it also has no two way references between the model or view
or the model or the controller or the view or the controller.

And that's not all, you also have no mutable references.

Let's let that sync for a moment, what does that mean. That means
that there is ownership of truth. Every component, every concern
is the only and sole owner of that part of your system and that
part of the truth.

This is where mercury and flux deviate.

## Slide 5

Let's go back to this diagram and talk more about it. The first
thing I want to point out is that these arrows are dotted, with
that i mean there is an immutable reference.

The raw input is in charge of knowing how to read from the DOM
by the time it's done and it passes a logical event to the Input,
the Input no longer has a reference to the DOM event. There is 
zero shared mutable state between these two pieces.

The input only has action to methods or plain functions that
can update the state, It doesn't have a reference to the mutable
state. Again there is no shared mutable state.

The update and state logic, is where actual mutation happens, it
has to happen somewhere and it happens here and only here, this
is the source of truth for your application.

When the update logic is done we create a new immutable snapshot
of the entire application state and we pass it off to the render
function.

The render function just has this immutable snapshot, can't touch
the Input or the update logic or the mutable state, in fact the
Render function is just a pure function, there is no mutable
shared state here.

When render is done we have a new virtual DOM tree and we do
a diff / patch to update the mutable DOM. This is the only place
in which we write to the DOM, this is the source of truth and
source of ownership for DOM mutation, since the virtual DOM tree
itself is also an immutable data structure there is no mutable
shared state here.
