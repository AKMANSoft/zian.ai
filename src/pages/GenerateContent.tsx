import MainLayout from "../components/layout";
import GrBorderBox from "../components/ui/gr-border-box";
import { cn } from "../lib/utils";
import { PrimaryWithNeon, SecondaryBtn } from "../components/ui/buttons";
import PostViewSection from "../components/postview-section";
import { InputEl } from "../components/ui/input";
import { TextAreaEl } from "../components/ui/textarea";
import SparkleButton from "@/components/ui/sparkle-btn";
import { useState, useEffect } from "react";
import LoadingSparkle from "@/components/LoadingSparkle";
import { changeImageUrl } from '@/lib/utils'

import {
  Form,
  useLoaderData,
} from 'react-router-dom'

import {
  contentApiClient,
  contentGenerateApiClient,
  answerApiClient,
} from '@/api.env'

import {
  twitterUserContext,
  profileContext,
} from '@/App'




const Topics = [
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
    "Anouncements",
    "Giveaways",
    "Engagement Questions",
    "Promotions",
]

export const basicTopicString = 'Basic';


export enum PostStatus {
    GENERATING,
    GENERATED,
    NOT_GENERATED
}

export async function action({ request, params }: any) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);

  console.log('formData', formData);
  console.log('updates', updates);

  // await updateContact(params.contactId, updates);
  // return redirect(`/contacts/${params.contactId}`);

  return null;
}


export default function GenerateContentPage() {
    const [selTopic, setSelTop] = useState(0);
    const [postStatus, setPostStatus] = useState<PostStatus>(PostStatus.NOT_GENERATED);

    const pageData: any = useLoaderData();
    // console.log(pageData);

    // const [topic, setTopic] = useState(pageData.topicsList[0].text);
    const [topics, setTopics] = useState<any[]>(pageData.topicsList);
    const [questions, setQuestions] = useState<any>(pageData.questions);
    const [answers, setAnswers] = useState<any>(pageData.answers);
    const [currentAnswers, setCurrentAnswers] = useState<any>(() => {
      let ans = new Map();
      for (const a of answers) {
        ans.set(a[0], a[1].text);
      }
      console.log('ans:', ans);
      return ans
    });

    const [deleteNumber, setDeleteNumber] = useState<number>(0);
    const [content, setContent] = useState<any>(null);

    const [values, setValues] = useState<any>(new Map());

    const [message, setMessage] = useState<string>('');
    const [messageClass, setMessageClass] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');

    const [createMessage, setCreateMessage] = useState<string>('');
    const [createMessageClass, setCreateMessageClass] = useState<string>('');
    const [createErrorMessage, setCreateErrorMessage] = useState<string>('');

    const onPostGenerateClicked = () => {
        setPostStatus(PostStatus.GENERATING);
        setTimeout(() => {
            setPostStatus(PostStatus.GENERATED);
        }, 4000);
    }

    useEffect(() => {
        async function startFetching() {
          let result = null;
          const contentsListRequest = {
            id: content.id,
            status: 1,
          }
          result = await contentApiClient.contentsList(contentsListRequest).then((r) => {
            console.log('Content:', r);
            return r.results;
          }).catch((e) => {
            console.log(e);
          });

          if (!ignore) {
            if (result && result?.length > 0) {
              setContent(result[0]);
            } else {
              setContent(null);
              setPostStatus(PostStatus.NOT_GENERATED);
            }
          }
        }

      let ignore = false;
      if (content) {
        startFetching();
        return () => {
          ignore = true;
        }
      }
    }, [deleteNumber]);

    function onSubmit(e: any) {
      e.preventDefault();
      setMessage('');
      setMessageClass('');
      setErrorMessage('');

      setCreateMessage('');
      setCreateMessageClass('');
      setCreateErrorMessage('');

      let isGenerated = true;
      setPostStatus(PostStatus.GENERATING);

      const formData = new FormData(e.target);
      // const updates = Object.fromEntries(formData);

      let lastData = new Map();
      for (const entry of formData) {
        const question_id = parseInt(entry[0]);
        const answer = entry[1].toString().trim();
        if (answer) {
          lastData.set(question_id, answer);
        } else {
          const msg_class = 'text-red-500';
          const message = `Please answer all questions`;
          setMessage(message);
          setMessageClass(msg_class);
          return;
        }
      }
      // console.log('formData onSubmit', formData);
      console.log('lastData onSubmit', lastData);
      // console.log('updates onSubmit', updates);

      // save answers or generate content
      const topicObj = topics[selTopic];
      console.log('topicObj', topicObj);
      const topic = topicObj.text
      console.log(`Create or update answers for topic: ${topic}`);

      let isAnswerChanged = false;
      if (lastData.size === 0) {
        // no questions, just generate content
        console.log('no questions, just generate content');
        isAnswerChanged = true;
      } else {
        let areAnswersChanged = false;
        let isCreate = false;

        for (const [question_id, answer] of lastData) {
          // console.log(question_id, answer);
          const existing_answer = answers.get(question_id);
          if (existing_answer) { // there was an answer for this project, update existing answer
            if (existing_answer.text.trim() === answer.trim()) {
              console.log(`The answers is not changed: ${answer}`);
              continue;
            }
            isAnswerChanged = true;
            areAnswersChanged = true;

            const answerObj = {
              id: existing_answer.id,
              text: answer,
              question: question_id,
              project: existing_answer.project,
            }
            const answersUpdateRequest = {
              id: existing_answer.id,
              data: answerObj,
            }

            answerApiClient.answersUpdate(answersUpdateRequest).then((r) => {
              console.log('Updated one answer', r);

              currentAnswers.set(r.question,  r.text);
              setCurrentAnswers(new Map([...currentAnswers.entries()]));

              const msg_class = 'text-green-500';
              // const message = `Updated answer for question: ${question_id}`;
              const message = `Updated answers successfully`;
              setMessage(message);
              setMessageClass(msg_class);

              // check if answers are changed
              // Generate content
            }).catch((e) => {
              const msg_class = 'text-red-500';
              // const message = `Failed to update answer for question: ${question_id}`;
              const message = `Failed to update answers`;
              setMessage(message);
              setErrorMessage(message);
              setMessageClass(msg_class);

              console.log('Failed update request', answersUpdateRequest);
            });
          } else {  // create new answer
            isAnswerChanged = true;
            isCreate = true;

            const answerObj = {
              text: answer,
              question: question_id,
              project: pageData.profile.currentProject,
            }
            const answersCreateRequest = {
              data: answerObj,
            }

            answerApiClient.answersCreate(answersCreateRequest).then((r) => {
              console.log('Created one answer', r);

              currentAnswers.set(r.question,  r.text);
              setCurrentAnswers(new Map([...currentAnswers.entries()]));

              const msg_class = 'text-green-500';
              // const message = `Created answer for question: ${question_id}`;
              const message = `Created answers successfully`;
              setMessage(message);
              setMessageClass(msg_class);

              // Generate content
            }).catch((e) => {
              const msg_class = 'text-red-500';
              // const message = `Failed to create answer for question: ${question_id}`;
              const message = `Failed to create answers`;
              setMessage(message);
              setErrorMessage(message);
              setMessageClass(msg_class);

              console.log('Failed update request', answersCreateRequest);
            });
          }
        }

        if ((! isCreate) && (! areAnswersChanged)) {
          // no changing, no creating
          const msg_class = 'text-green-500';
          // const message = `Created answer for question: ${question_id}`;
          const message = `No answers changed`;
          setMessage(message);
          setMessageClass(msg_class);

          setPostStatus(PostStatus.NOT_GENERATED);
          isGenerated = false;
        }
      }

      if (isAnswerChanged) {
        // generate new content because of changing answers
        console.log('Generating content for changing answers');
        const contentsGenerateGenerateContentRequest = {
          topic: topic,
          project: pageData.profile.currentProject,
        }
        contentGenerateApiClient.contentsGenerateGenerateContent(contentsGenerateGenerateContentRequest).then((r) => {
          console.log(r);
          if (r.length > 0) {
            setContent(r[0]);
          }

          const msg_class = 'text-green-500';
          const message = `Created ${r.length} content successfully`;
          setCreateMessage(message);
          setCreateMessageClass(msg_class);
        }).catch((e) => {
          console.log('Error:', e);

          const msg_class = 'text-red-500';
          const message = `Failed to create content, please make sure all other topic questions above this topic are answered`;
          setCreateMessage(message);
          setCreateErrorMessage(message);
          setCreateMessageClass(msg_class);
        }).finally(() => {
          setPostStatus(PostStatus.GENERATED);
        });
      } else {
        if (isGenerated) {
          setPostStatus(PostStatus.GENERATED);
        }
      }
    }

    return (
        <MainLayout heading="Generate Content" user={pageData.user}>
            <div className="pb-5 flex flex-col lg:flex-row gap-5 min-h-[calc(100vh_-_130px)]">
                <GrBorderBox className="w-full p-px md:p-[2px] rounded-20 lg:max-h-[calc(100vh_-_130px)]" type="lg">
                    <div className="h-full min-h-[500px] bg-gr-purple-light backdrop-blur-[10px] opacity-90 rounded-20 relative overflow-hidden">
                        {/* Main Content  */}
                        <div className="flex flex-wrap w-full h-full">
                            <div className="w-full lg:w-[35%] xl:w-[30%] border-b-[5px] border-r border-primary px-5 py-3 lg:py-4 max-h-[70px] flex items-center">
                                <h3 className="text-white text-xl leading-8 font-normal font-nebula">
                                    Select Topic
                                </h3>
                            </div>
                            <div className="hidden lg:flex lg:w-[65%] xl:w-[70%] border-b-4 border-primary px-5 py-4 max-h-[70px] items-center">
                                <p className="font-jakarta text-sm font-normal leading-7 text-white/70">
                                  {/*Please answer these questions. Basic topic questions are required, other topic questions are optional.*/}
                                  Basic topic questions are required to answer, other topic questions are optional.
                                </p>
                            </div>
                            <div className="w-full lg:w-[35%] xl:w-[30%] border-r border-primary lg:h-full lg:max-h-[calc(100%_-_70px)] overflow-y-auto">
                                <div className="w-full px-3 lg:px-5 py-4 gap-3 flex flex-row lg:flex-col max-w-full overflow-x-auto lg:overflow-hidden no-scrollbar">
                                    {
                                        // Topics.map((topic, index) => (
                                        topics.map((topic, index) => (
                                            <PrimaryWithNeon onClick={() => {
                                                setSelTop(index);

                                                setMessage('');
                                                setMessageClass('');
                                                setErrorMessage('');

                                                setCreateMessage('');
                                                setCreateMessageClass('');
                                                setCreateErrorMessage('');

                                                setPostStatus(PostStatus.NOT_GENERATED);
                                              }}
                                              active={selTopic === index}
                                                className="w-full min-w-max lg:min-w-0 block text-[15px] leading-6 font-medium overflow-hidden text-start text-ellipsis max-w-full whitespace-nowrap ">
                                              {topic.text === basicTopicString ? <>{basicTopicString} <span className="text-red-500" style={{verticalAlign : 'middle'}}>*</span></> : topic.text}
                                            </PrimaryWithNeon>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="w-full lg:w-[65%] xl:w-[70%] lg:h-full pb-3 lg:pb-10 gap-5 max-h-[calc(100%_-_70px)] overflow-y-auto">
                              <Form method="post" id="question-form"
                                onSubmit={onSubmit}
                              >
                                <div>
                                    <div className="p-3 lg:p-5 lg:pt-8 space-y-4">
                                        {
                                          questions.get(topics[selTopic].text)?.map((question: any, index: number) => (
                                            // <InputEl id={question.id} label={question.text} placeholder="Write your answer here" value={ answers.get(question.id)?.text } />
                                            <TextAreaEl id={`q${question.id}`} name={`${question.id}`}
                                              label={question.text}
                                              placeholder="Write your answer here"
                                              // value={ answers.get(question.id)?.text }
                                              value={ currentAnswers.get(question.id) }
                                              // defaultValue ={ answers.get(question.id)?.text }
                                              rows={2} cols={10}
                                              maxLength={1000}
                                              required={false}
                                              onChange={(e: any) => {
                                                // console.log(e);
                                                // console.log(e.target);
                                                // console.log(e.target.value);
                                                currentAnswers.set(question.id,  e.target.value);
                                                setCurrentAnswers(new Map([...currentAnswers.entries()]));
                                              }}
                                              textAreaClassName={cn(
                                                "text-white h-full text-start font-jakarta font-light text-sm leading-6 py-3 px-5",
                                                "border border-white/10 appearance-none rounded-10 w-full bg-transparent mt-2",
                                                "focus:bg-th-gray/10 outline-none transition-all placeholder:text-white/70"
                                              )}
                                            />
  
                                          )) || <span className="text-sm font-semibold font-jakarta text-white">No questions, please just click the button to generate content</span>
                                        }
                                    </div>
                                </div>
                                <div className="flex justify-end p-3 lg:p-6">
                                  {/*<SparkleButton onClick={onPostGenerateClicked} className="px-10 h-12" type={'submit'}>*/}
                                    <SparkleButton className="px-10 h-12" type={'submit'} disabled={postStatus === PostStatus.GENERATING}>
                                        Generate
                                    </SparkleButton>
                                </div>
                              </Form>
                              <div className="p-3 lg:p-5 lg:pt-8 space-y-4">
                                {
                                  errorMessage ? 
                                  <p className="text-red-500">{errorMessage}</p>
                                  :
                                  <p className={messageClass}>{message}</p>
                                }
                                {
                                  createErrorMessage ? 
                                  <p className="text-red-500">{createErrorMessage}</p>
                                  :
                                  <p className={createMessageClass}>{createMessage}</p>
                                }
                              </div>
                            </div>
                        </div>
                    </div>
                </GrBorderBox>
                <PostViewSection
                    className="w-full lg:w-1/3 min-h-[700px] lg:min-h-0"
                    contentClassName="px-4 pt-10 pb-5"
                    heading={
                        <h5 className="text-xl text-white font-nebula font-normal leading-8">
                            Result
                        </h5>
                    }
                    scheduled={false}
                    customContent={
                        postStatus === PostStatus.GENERATED
                            ? null
                            : <EmptyPostContent loading={postStatus === PostStatus.GENERATING} />
                    }
                    deleteNumber={deleteNumber}
                    setDeleteNumber={setDeleteNumber}
                    content={content}
                />
            </div>
        </MainLayout>
    );
}





type EmptyPostContentProps = {
    loading?: boolean;
}

function EmptyPostContent({ loading = false }: EmptyPostContentProps) {
    return (
        <div className="h-full flex flex-col">
            <h5 className="text-xl text-white font-nebula font-normal leading-8 text-shadow">
                Result
            </h5>
            <div className={cn(
                "rounded-20 w-full h-full bg-white/5 backdrop-blur-[10px]",
                "flex flex-col items-center justify-center px-8 text-center mt-3"
            )}>
                {
                    loading ?
                        <div className="w-full flex flex-col items-center justify-center text-center">
                            <LoadingSparkle spark />
                            <h4 className="text-lg font-semibold font-jakarta mt-5 text-white">
                                Regenerating content
                            </h4>
                            <p className="text-sm font-normal font-jakarta text-white/70 mt-">
                                Sed consectetur imperdiet facilisis. Nulla maa.
                            </p>
                            <SecondaryBtn filled={false} className="mt-5">
                                Cancel
                            </SecondaryBtn>
                        </div>
                        :
                        <>
                            <img src={changeImageUrl("/images/file-round-with-boder.svg")} loading="lazy" width={70} height={70}
                                className="w-[70px] h-auto aspect-square"
                                alt="" />
                            <h4 className="text-xl leading-7 font-semibold font-jakarta mt-[10px] text-white">
                                The new content will be shown here
                            </h4>
                            <p className="text-sm font-normal font-jakarta text-white/70 mt-2">
                              {/*Sed consectetur imperdiet facilisis. Nulla maa.*/}
                              If you want to check the generated content, please go to page "Drafts"
                            </p>
                        </>
                }
            </div>
        </div>
    );
}



