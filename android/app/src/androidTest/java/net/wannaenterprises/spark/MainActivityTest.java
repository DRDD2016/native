package net.wannaenterprises.spark;


import android.support.test.espresso.ViewInteraction;
import android.support.test.espresso.matcher.RootMatchers;
import android.support.test.rule.ActivityTestRule;
import android.support.test.runner.AndroidJUnit4;
import android.test.suitebuilder.annotation.LargeTest;
import android.view.View;
import android.view.ViewGroup;
import android.view.ViewParent;

import org.hamcrest.Description;
import org.hamcrest.Matcher;
import org.hamcrest.TypeSafeMatcher;
import org.hamcrest.core.IsInstanceOf;
import org.junit.Rule;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.ClassRule;
import org.junit.BeforeClass;
import org.junit.Before;

import static android.support.test.espresso.Espresso.onView;
import static android.support.test.espresso.Espresso.onData;
import static android.support.test.espresso.Espresso.pressBack;
import static android.support.test.espresso.action.ViewActions.*;
import static android.support.test.espresso.assertion.ViewAssertions.*;
import static android.support.test.espresso.matcher.RootMatchers.withDecorView;
import static android.support.test.espresso.matcher.ViewMatchers.*;
import static org.hamcrest.Matchers.allOf;
import static org.hamcrest.Matchers.anything;
import static org.hamcrest.Matchers.is;
import static org.hamcrest.Matchers.not;
import static org.hamcrest.Matchers.equalTo;
import static android.support.test.espresso.action.ViewActions.click;
import static android.support.test.espresso.action.ViewActions.pressKey;
import static android.support.test.espresso.action.ViewActions.replaceText;
import static android.support.test.espresso.matcher.ViewMatchers.isDisplayed;
import static android.support.test.espresso.matcher.ViewMatchers.withContentDescription;
import static android.support.test.espresso.matcher.ViewMatchers.withId;

import tools.fastlane.screengrab.Screengrab;
import tools.fastlane.screengrab.UiAutomatorScreenshotStrategy;
import tools.fastlane.screengrab.locale.LocaleTestRule;

@LargeTest
@RunWith(AndroidJUnit4.class)
public class MainActivityTest {

    @ClassRule
    public static final LocaleTestRule localeTestRule = new LocaleTestRule();

    @Rule
    public ActivityTestRule<MainActivity> mActivityTestRule = new ActivityTestRule<>(MainActivity.class);

    private MainActivity mActivity = null;

    @Before
    public void setActivity() {
        mActivity = mActivityTestRule.getActivity();
    }

    @BeforeClass
    public static void beforeAll() {
        Screengrab.setDefaultScreenshotStrategy(new UiAutomatorScreenshotStrategy());
    }

    @Test
    public void mainActivityTest() {
        // Added a sleep statement to match the app's execution delay.
        // The recommended way to handle such scenarios is to use Espresso idling resources:
        // https://google.github.io/android-testing-support-library/docs/espresso/idling-resource/index.html

        try {
            Thread.sleep(15000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("Feed");

        onView(allOf(withClassName(is("com.facebook.react.views.viewpager.ReactViewPager")), isDisplayed())).perform(swipeLeft());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("Profile");
        onView(allOf(withClassName(is("com.facebook.react.views.viewpager.ReactViewPager")), isDisplayed())).perform(swipeLeft());

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("CreateDetails");
        onView(allOf(withContentDescription("Event name"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Event name"), isDisplayed())).perform(replaceText("Friday Night Drinks"), closeSoftKeyboard());
        onView(allOf(withContentDescription("Event description"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Event description"), isDisplayed())).perform(replaceText("Whoo-hoo, the end of the week"), closeSoftKeyboard());
        onView(allOf(withContentDescription("Note"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Note"), isDisplayed())).perform(replaceText("Hey guys, please vote for your preferred venue and date"), closeSoftKeyboard());

        Screengrab.screenshot("CreateDetailsFilled");

        onView(allOf(withContentDescription("Confirm Event Details"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Confirm Event Details"), isDisplayed())).perform(click());

        Screengrab.screenshot("CreateWhat");

        onView(allOf(withContentDescription("What option 1"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("What option 1"), isDisplayed())).perform(replaceText("Pub Lunch"), closeSoftKeyboard());
        onView(allOf(withContentDescription("Add What option"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Add What option"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("What option 2"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("What option 2"), isDisplayed())).perform(replaceText("Cocktails"), closeSoftKeyboard());
        onView(allOf(withContentDescription("Add What option"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Add What option"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("What option 3"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("What option 3"), isDisplayed())).perform(replaceText("Wine Bar"), closeSoftKeyboard());

        Screengrab.screenshot("CreateWhatFilled");

        onView(allOf(withContentDescription("Confirm What"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Confirm What"), isDisplayed())).perform(click());


        Screengrab.screenshot("CreateWhere");

        onView(allOf(withContentDescription("Add Where option"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Add Where option"), isDisplayed())).perform(click());
        onView(allOf(withParent(withParent(withContentDescription("Where option 1"))), withHint("Where"), isDisplayed())).perform(click());
        onView(allOf(withParent(withParent(withContentDescription("Where option 1"))), withHint("Where"), isDisplayed())).perform(replaceText("Oxford"), closeSoftKeyboard());


        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withParent(withParent(withContentDescription("Where option 2"))), withHint("Where"), isDisplayed())).perform(click());
        onView(allOf(withParent(withParent(withContentDescription("Where option 2"))), withHint("Where"), isDisplayed())).perform(replaceText("Covent Garden, London"), closeSoftKeyboard());

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withParent(withParent(withContentDescription("Where option 3"))), withHint("Where"), isDisplayed())).perform(click());
        onView(allOf(withParent(withParent(withContentDescription("Where option 3"))), withHint("Where"), isDisplayed())).perform(replaceText("Shoreditch, London"), closeSoftKeyboard());

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("CreateWhereFilled");

        onView(allOf(withContentDescription("Confirm Where"), isDisplayed())).perform(click());
        onView(allOf(withContentDescription("Confirm Where"), isDisplayed())).perform(click());

        try {
            Thread.sleep(5000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        Screengrab.screenshot("CreateWhen");


        Screengrab.screenshot("CreateWhenFilled");

        onView(allOf(withContentDescription("Confirm When"), isDisplayed())).perform(click());

        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        onView(allOf(withChild(withText("Invite friends")), isDisplayed())).perform(click());


        try {
            Thread.sleep(10000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        onView(allOf(withClassName(is("com.facebook.react.views.viewpager.ReactViewPager")), isDisplayed())).perform(swipeRight());
        onView(allOf(withClassName(is("com.facebook.react.views.viewpager.ReactViewPager")), isDisplayed())).perform(swipeRight());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withChild(withChild(withText("Amy's Birthday Drinks"))), isDisplayed())).perform(click());

        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        onView(allOf(withChild(withChild(withText("Cocktails"))), isDisplayed())).perform(click());

        Screengrab.screenshot("HostPoll");



    }



}
