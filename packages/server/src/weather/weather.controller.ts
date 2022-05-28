import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { Public } from "../commons/decorators/public.decorator";
import { Weather } from "../commons/entities/weather.entity";
import { CreateWeatherRequestDto } from "./dtos/create-weather.request.dto";
import { GetWeatherResponseDto } from "./dtos/get-weather.response.dto";
import { WeatherService } from "./weather.service";

@Controller("weathers")
@ApiTags("[weather] 날씨 도메인 API")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Public()
  @Get()
  @ApiOperation({
    summary: "날씨 조회 API",
    description: "홈 화면에서 날씨를 조회합니다.",
  })
  @ApiResponse({
    status: 200,
    description: "날씨 테이블의 최근 객체 값",
    type: Weather,
  })
  async getWeather(): Promise<GetWeatherResponseDto> {
    return this.weatherService.getWeather();
  }

  @Public()
  @Post()
  @ApiOperation({
    summary: "날씨 데이터 가져오기 API",
    description: "스크래핑을 통해 날씨 데이터를 가져옵니다.",
  })
  @ApiResponse({
    status: 201,
    description: "가져오기 성공",
  })
  async createWeather(
    @Body() createWeatherRequestDto: CreateWeatherRequestDto,
  ): Promise<void> {
    return this.weatherService.createWeather(createWeatherRequestDto);
  }
}