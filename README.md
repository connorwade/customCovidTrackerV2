This project is depriecated and only used as an example of where I started as a developer.

## Custom Covid Tracker Project

This project began in early April 2020 as my own personal dashboard for tracking Covid numbers. I was interested in the spread of Covid as a former researcher in the space of antibodies. I had a lot of problems with the online trackers at the time. They often had too little or too much data, they showed the wrong data, and they provided very little in the way of analytics. I wanted to solve that problem with a quick dashboard that would allow users to customize what information they were recieving from a tracker.

### How the project was built

When this project began I was just starting getting serious about web development and wanted an excuse to use a Javascript framework. I chose React mostly because of it's popularity.

For it's theme, I used MaterialUI. I figured it was better to use a tried and true design system over something I thought looked "cool" or tried to think of. I am not a designer and I don't have an eye for design, so I default to a good average design over flashy and new ones.

Overall this app is pretty simple. It makes a call to an API to get data, organizes it, and then delivers it to the user. The user can then select options and set the state of the app. Those options are then saved locally.

### Retrospective

Looking at this app now I think there's a few things that I could do better

#### 1. Better data and API call management

Any time the app is used I would make a call to the API to get my info. And I would get **all** the data. Any time you performed a function call, such as the smoothing algorithm or logorithmic algorithm, I would actually perform it for all the data.

If I wanted to keep the app strictly frontend, I think these days I would cache the data and only perform actions on currently loaded data.

However, I think a better solution would be to build a backend. With a backend I could've updated my data once and day. I also could've cached it better. At the time, I probably could've even gotten away with using a very simple backend like Python. However, back then, even simple servers seemed like magic to me.

#### 2. Better organization and state management

At the time this app was written, I still struggled with state management in apps. I still think that it's something I'm only on the cusp of having a deep understanding, but I can tell that I was really bad at state management at the time.

There are many places where components far outgrow their scope because I am managing all the functionality within the component. The idea of seperating my templating from my logic never really entered my head at the time. So many React tutorials show components where all functionality is being done within the component itself, but that's pretty rare for how React is actually used.

As for State management, I couldn't really grasp the concept of having a parent component manage the state of child components. Components managed their own state I thought. And if they couldn't, then that was when I used global state. Now I understand this concept much better and could've written better components.
