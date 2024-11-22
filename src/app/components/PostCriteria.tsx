import React, { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { filterCategories, filterCategoriesArray, filterPostRoles, getFilterOrPostRole, personals, work } from '@/constants/filter';
import { concatenatePostFilterArray } from '@/helper/index';

const PostCriteria = ({ setPostFilterValue, purpose, setIsOpen, isOpen }: any) => {
    // const [isOpen, setIsOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [responses, setResponses] = useState([] as any);
    const [currentResponse, setCurrentResponse] = useState(null as any);
    const [questions, setQuestions] = useState([] as any);
    const [showSequence, setShowSequence] = useState(false);
    const [role, setRole] = useState("");
    const [category, setCategory] = useState("");

    const handleOptionSelect = (value: any) => {
        if (questions[currentStep].type === "checkbox") {
            // For checkboxes, manage multiple selections
            const currentValues: any = Array.isArray(currentResponse) ? currentResponse : [];
            const updatedValues = currentValues.includes(value)
                ? currentValues.filter((item: any) => item !== value)
                : [...currentValues, value];
            setCurrentResponse(updatedValues);
        } else {
            // For radio buttons, single selection
            setCurrentResponse(value);
        }
    };


    const handleNext = () => {
        setResponses([...responses, currentResponse]);
        setCurrentStep(currentStep + 1);
        setCurrentResponse(null);
    };

    const updateCategory = (category: string) => {

        switch (category) {
            case filterCategories.PERSONALS:
                setQuestions(personals);
                setResponses([filterCategories.PERSONALS]);
                break;
            case filterCategories.WORK:
                setQuestions(work);
                setResponses([filterCategories.WORK]);
                break;
            default:
                break;
        }
    }

    const handleSubmit = () => {
        const finalResponses = [...responses, currentResponse];
        const postFilterArrayString = concatenatePostFilterArray(finalResponses);
        const queryRole = getFilterOrPostRole({category, purpose, role})
        console.log("Final responses queryRolequeryRolequeryRole:", queryRole);
        setIsOpen(false);
        setCurrentStep(0);
        setResponses([]);
        setCurrentResponse(null);
        setPostFilterValue({
            postFilterDisplayString: postFilterArrayString,
            queryRole
        });
    };

    const handleModalClose = () => {
        setIsOpen(false);
        setCurrentStep(0);
        setResponses([]);
        setCurrentResponse(null);
    };

    const isResponseValid = () => {
        if (questions[currentStep].type === "checkbox") {
            return Array.isArray(currentResponse) && currentResponse.length > 0;
        }
        return currentResponse !== null;
    };

    const renderOptions = () => {
        const { type, options } = questions[currentStep];

        if (type === "checkbox") {
            return (
                <div className="space-y-4">
                    {options.map((option: any) => {

                        const optionText = option.title ? option.title : option;
                
                        return (
                            <div key={optionText} className="flex items-center space-x-2">
                                <Checkbox
                                    id={optionText}
                                    checked={Array.isArray(currentResponse) && currentResponse.includes(optionText)}
                                    onCheckedChange={() => {
                                        if (option.title) {
                                            setRole(option.value);
                                        }
                                        else {
                                            setRole(filterPostRoles.BOTH)
                                        }

                                        handleOptionSelect(optionText)
                                    }}
                                />
                                <Label htmlFor={optionText}>{optionText}</Label>
                            </div>
                        )
                    })}
                </div>
            );
        }

        return (
            <RadioGroup
                value={currentResponse}
                onValueChange={handleOptionSelect}
                className="space-y-4"
            >
                {options.map((option: any) => (
                    <div key={option} className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option}>{option}</Label>
                    </div>
                ))}
            </RadioGroup>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Open Questionnaire</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">

                {showSequence ?
                    <>
                        <DialogHeader>
                            <DialogTitle>
                                {questions[currentStep].prompt}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="mt-4 space-y-6">
                            {renderOptions()}

                            <div className="flex justify-end space-x-2">
                                {currentStep > 0 && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            setCurrentStep(currentStep - 1);
                                            setResponses(responses.slice(0, -1));
                                            setCurrentResponse(responses[responses.length - 1]);
                                        }}
                                    >
                                        Back
                                    </Button>
                                )}

                                {currentStep < questions.length - 1 ? (
                                    <Button
                                        onClick={handleNext}
                                        disabled={!isResponseValid()}
                                    >
                                        Next
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleSubmit}
                                        disabled={!isResponseValid()}
                                    >
                                        Submit
                                    </Button>
                                )}
                            </div>
                        </div>
                    </>
                    :
                    <div>
                        <DialogHeader>
                            <DialogTitle>
                                Choose category
                            </DialogTitle>
                        </DialogHeader>

                        <RadioGroup
                            // value={currentResponse}
                            onValueChange={(category) => {
                                setCategory(category);
                                updateCategory(category)
                            }}
                            className="space-y-4"
                        >
                            {filterCategoriesArray.map((category: any) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <RadioGroupItem value={category} id={category} />
                                    <Label htmlFor={category}>{category}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                        <Button
                            onClick={() => {
                                setShowSequence(true);
                            }}
                            disabled={!questions.length}
                        >
                            Submit
                        </Button>
                    </div>
                }

            </DialogContent>
        </Dialog>
    );
};

export default PostCriteria