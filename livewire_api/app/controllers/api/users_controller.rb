module Api
    class UsersController < Api::ApplicationController
      before_action :authenticate_user
      before_action :set_user, only: [:show, :update, :destroy]
  
      def index
        @users = User.all
        render json: @users, each_serializer: UserSerializer
      end
  
      def show
        @user = User.find(params[:id])
        Rails.logger.info current_user.inspect
        render json: @user, serializer: UserSerializer
        #p @user.to_json
      end
  
      def create
        @user = User.new(user_params)
  
        if @user.save
          render json: @user, status: :created, location: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end
  
      def update
        if @user.update(user_params)
          render json: @user
        else
          render json: @user.errors, status: :unprocessable_entity
        end
      end
  
      def destroy
  
        @user.destroy
      end
  
      private
        def set_user
          @user = User.find(params[:id])
        end
  
        def user_params
          params.require(:user).permit(:name, :email, :password, :password_confirmation)
        end
    end
  end