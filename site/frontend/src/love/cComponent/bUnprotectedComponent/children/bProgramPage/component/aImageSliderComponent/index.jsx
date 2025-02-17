import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from "@/love/hAsset/business/1.png"
import Autoplay from "embla-carousel-autoplay"


const ImageSliderComponent = ({ Redux }) => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full max-w-sm md:max-w-lg lg:max-w-max"
    >
      <CarouselContent>
        {Redux.state.ReceivedObject?.Retrieve?.dGalleryImages?.map((each, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card className="bg-transparent border-none" >
                <CardContent className="flex aspect-auto items-center justify-center p-0">
                  {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                  <img className="object-cover object-center rounded" alt="hero" src={each?.url} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default ImageSliderComponent
