import { api } from "~/utils/api";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "./ui/input";
import { FormEvent, useState } from "react";


const FormSchema = z.object({
  role: z.enum(["seller", "shipper"], {
    required_error: "You need to select a role."
  }).default("seller"),
  city: z.string({
    required_error: "You need to provide your current city"
  }),
  company: z.string({
    required_error: "You need to provice your company name"
  }),
  phoneNumber: z.string({
    required_error: "You need to provide your phone number"
  }),
  deliveryMethod: z.string()
});

export const SetupModal = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const ctx = api.useContext();

  const { mutate, isLoading } =
    api.users.setUserInfo.useMutation({
      onSuccess: () => {
        void ctx.users.getUser.invalidate();
        setDrawerOpen(false);
      },
      onError: () => {
        console.log("Setting User Role Failed");
      },
    });

  const sumbitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // if (form.getValues("role") === "shipper" && !form.getValues("deliveryMethod"))
    mutate({
      isSeller: form.getValues("role") === "seller" ? true : false,
      companyName: form.getValues("company"),
      phoneNumber: form.getValues("phoneNumber"),
      city: form.getValues("city"),
      deliveryMethod: form.getValues("deliveryMethod")
        ? form.getValues("deliveryMethod")
        : null,
    });
  };

  return (
    <>
      <div className="w-full p-2">
        <Alert variant="destructive">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="font-semibold">Account Setup</p>
          </div>
          <AlertDescription className="flex items-center justify-between">
            <span className="text-md">You Sign up setup is not finished.</span>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
              <DrawerTrigger>
                <Button
                  variant={"destructive"}
                >
                  finish your setup
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <div className="mx-auto w-full px-[25%]">
                  <DrawerHeader>
                    <DrawerTitle>Complete your account setup.</DrawerTitle>
                    <DrawerDescription>This is for us to know each other better!</DrawerDescription>
                  </DrawerHeader>
                  <div>
                    <Form {...form}>
                      <form onSubmit={sumbitForm} className="w-full space-y-6">
                        <FormField
                          control={form.control}
                          name="role"
                          render={({ field }) => (
                            <FormItem className="space-y-4">
                              <FormLabel>What is your role: </FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="seller" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Seller
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="shipper" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Shipper
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>

                          )}
                        />
                        <div className="flex items-center space-x-6">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your current city" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Company</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your Company Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="flex items-center space-x-6">
                          <FormField
                            control={form.control}
                            name="phoneNumber"
                            render={({ field }) => (
                              <FormItem className="w-full">
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input placeholder="+212600000000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {
                            form.watch("role") === "shipper" ?
                              (<FormField
                                control={form.control}
                                name="deliveryMethod"
                                render={({ field }) => (
                                  <FormItem className="w-full">
                                    <FormLabel>Delivery Method</FormLabel>
                                    <FormControl>
                                      <Input placeholder="your delivery method" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />) : <div className="w-full"></div>
                          }
                        </div>
                        <div className="space-x-4 flex items-center justify-end">
                          {isLoading 
                          ? (<Button type="submit" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" />Please Wait</Button>) 
                          : (<Button type="submit">Submit</Button>)
                          }
                          <DrawerClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DrawerClose>
                        </div>
                      </form>
                    </Form>
                  </div>
                </div>
              </DrawerContent>
            </Drawer>
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};
