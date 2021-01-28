class Api::V1::UsersController < ApplicationController
  #before_action :authenticate_user
  before_action :authenticate_user, except: [:new]
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    session[:u_id] = current_user.id
    p session[:u_id]
    if @users.ids.include? current_user.id
      render :json => {id:current_user.id, name: current_user.username}, status: 201
    else 
      render json: { errors: @users.errors.full_messages }, status: :unprocessible_entity
    end
  end

  # GET /users/1
  def show
    @user = User.find(params[:id])
    
  end

  # POST /users
  def create
    @user = User.create(user_params)
    render json: @user, status: 201
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
