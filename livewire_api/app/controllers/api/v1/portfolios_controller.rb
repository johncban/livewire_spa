class Api::V1::PortfoliosController < ApplicationController
  before_action :authenticate_user

  # skip_before_action :authorized, only: [:index]

  def index
    @portfolios = Portfolio.all.where(user_id: params['user_id'])
    render json: @portfolios, only: %i[id portfolio_name user_id], status: 201
  end

  def show
    @portfolios = Portfolio.find(params[:id])
    
    render json: @portfolios # , include: [:stocks]
  end

  def create
    @portfolio = Portfolio.create(portfolio_params)
    if @portfolio.save
       render json: @portfolio, status: 201
    else 
        render json: {error: 'Could not save nor create'}
    end
  end

  def destroy
    @portfolio = Portfolio.find(params[:id])
    if (@portfolio.user_id == current_user.id)
       @portfolio.destroy
       render json: {id: @portfolio.id}, status: 200
    end

=begin
    if (@portfolio.destroy)
      #render json: { message: "#{@portfolio.portfolio_name} Portfolio and Stocks are Deleted." }, status: 200
      render json: {id: @portfolio.id}, status: 200
    end
=end
  end

  def update
    @portfolio = Portfolio.find(params[:id])
    render json: @portfolio, status: 200 if @portfolio.update(portfolio_params)
  end

  private

  def portfolio_params
    params.require(:portfolio).permit(:portfolio_name, :user_id)
  end
end
